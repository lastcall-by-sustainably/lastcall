<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Spinner } from '$lib/components/ui/spinner';
  import { contactFormSchema, type ContactFormSchema } from '$lib/components/contact-form/contact-form-schema';
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from 'sveltekit-superforms';
  import { zod4Client } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';
  import SendIcon from '@lucide/svelte/icons/send';

  let { data }: { data: { contactForm: SuperValidated<Infer<ContactFormSchema>> } } = $props();

  // svelte-ignore state_referenced_locally
  const form = superForm(data.contactForm, {
    validators: zod4Client(contactFormSchema),
    onUpdate: ({ form: f }) => {
      if (f.valid) {
        toast.success('Thank you for reaching out! We will get back to you as soon as possible.');
      } else {
        toast.error('Please fix the errors in the form.');
      }
    },
    onError: () => {
      toast.error('An unexpected error occurred. Please try again later.');
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<form method="POST" use:enhance class="flex flex-col gap-4">
  <div class="flex flex-row gap-4">
    <Form.Field {form} name="firstName">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>First Name</Form.Label>
          <Input {...props} bind:value={$formData.firstName} placeholder="Your first name" />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="lastName">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Last Name</Form.Label>
          <Input {...props} bind:value={$formData.lastName} placeholder="Your last name" />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
  </div>
  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input type="email" {...props} bind:value={$formData.email} placeholder="email@example.com" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="subject">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Subject</Form.Label>
        <Input {...props} bind:value={$formData.subject} placeholder="What is this about?" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="message">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Message</Form.Label>
        <Textarea {...props} bind:value={$formData.message} placeholder="Tell us how we can help you..." />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button disabled={$submitting}>
    {#if $submitting}
      <Spinner />
    {:else}
      <SendIcon />
    {/if}
    Send Message
  </Form.Button>
</form>
