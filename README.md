# Razen Real Estate (React Web App)

A Razen real estate app built with React and TypeScript that allows users to search and view properties, save their favorite properties, and contact the realtor for more information.

## Features

- Search properties by location, price, and number of bedrooms
- View property details including images, description, and contact information
- Save favorite properties for easy access later
- Contact the realtor directly through the app

## Running the app

```
git@github.com:Elham-EN/razen-real-estate-app.git
```

```
npm install
```

```
npm run dev
```

## Build With

- TypeScript
- React v18
- Tailwind CSS
- React Router v6
- Google Firebase v9
- Vite (Frontend Tooling)

### Custom Hook Functions:

- useForm
  - allows for the logic and state management of a form to be abstracted away from the component itself. This makes the component simpler and easier to read, as well as more reusable. Additionally, it allows for the form logic to be unit tested separately from the component, making the testing process more efficient. The spread operator in the setFormData function allows for the existing key-value pairs in the formData object to be retained and only the desired key-value pair to be updated. This allows for the formData state to be updated in a more performant way.
