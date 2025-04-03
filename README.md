# Portfolio Website

A modern portfolio website built with Next.js, React, and Tailwind CSS.

## Features

- Responsive design
- Dark mode support
- Contact form with email notifications
- Project showcase
- Skills and experience sections

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:

```
EMAIL_USER=your_zoho_email@zoho.com
EMAIL_PASSWORD=your_zoho_email_password_or_app_specific_password
```

### Setting up Zoho Email for Contact Form

To enable the contact form to send emails, you need to set up a Zoho email account:

1. Create a Zoho Mail account at [https://www.zoho.com/mail/](https://www.zoho.com/mail/)
2. Set up your email address (e.g., yourname@zoho.com)
3. For security, it's recommended to create an app-specific password:
   - Log in to your Zoho Mail account
   - Go to Settings > Security > App Passwords
   - Create a new app password for your portfolio website
   - Use this app password in your `.env.local` file instead of your main account password

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The easiest way to deploy this portfolio is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Don't forget to add your environment variables in the Vercel project settings.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
