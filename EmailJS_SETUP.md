# Setting Up EmailJS for the Contact Form

To enable the contact form to send emails to info@conisontechnologies.com, follow these steps:

## 1. Create an EmailJS account

- Sign up at [EmailJS](https://www.emailjs.com/)
- Verify your account

## 2. Set up an Email Service

- Go to the EmailJS dashboard
- Create a new Email Service (Gmail, Outlook, or custom SMTP)
- Name your service (e.g., "Conison Contact Service")
- Note the Service ID (e.g., "service_xxxxxxx")

## 3. Create an Email Template

- In the EmailJS dashboard, go to Email Templates
- Create a new template
- Design your template with the following parameters:
  - `to_email`: Email recipient (info@conisontechnologies.com)
  - `from_name`: Sender's name
  - `from_email`: Sender's email
  - `subject`: Email subject
  - `message`: Message content
  - `company`: Company name (optional)
  - `phone`: Phone number (optional)
  - `service`: Service requested (optional)
- Note the Template ID (e.g., "template_xxxxxxx")

## 4. Update Environment Variables

- In your project, update the `.env` file with the following values:
  ```
  REACT_APP_EMAILJS_SERVICE_ID=your_service_id
  REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
  REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
  ```

## 5. Restart your development server

- Stop your current server with Ctrl+C
- Run `npm start` to restart with the new environment variables

Now your contact form should be able to send real emails to info@conisontechnologies.com when visitors submit the form.

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Integration](https://www.emailjs.com/docs/examples/reactjs/) 