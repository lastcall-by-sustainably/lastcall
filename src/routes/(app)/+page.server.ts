import type { PageServerLoad, Actions } from './$types';
import { fail, error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { contactFormSchema } from '$lib/components/contact-form/contact-form-schema';
import { zod4 } from 'sveltekit-superforms/adapters';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

export const load: PageServerLoad = async () => {
  return {
    contactForm: await superValidate(zod4(contactFormSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const contactForm = await superValidate(event, zod4(contactFormSchema));
    if (!contactForm.valid) {
      return fail(400, {
        contactForm,
      });
    }

    try {
      const resend = new Resend(RESEND_API_KEY);
      const { error: resendError } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'lastcallbysustainably@gmail.com',
        subject: `New contact form submission from ${contactForm.data.firstName} ${contactForm.data.lastName}`,
        html: `
          <p><strong>Name:</strong> ${contactForm.data.firstName} ${contactForm.data.lastName}</p>
          <p><strong>Email:</strong> ${contactForm.data.email}</p>
          <p><strong>Subject:</strong> ${contactForm.data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${contactForm.data.message}</p>
        `
      });
      if (resendError) {
        error(500);
      }
    } catch (err) {
      error(500);
    }

    return {
      contactForm,
    };
  },
}
