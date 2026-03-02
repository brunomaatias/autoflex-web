# AutoFlex Web 🏭

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

AutoFlex Web is a modern, responsive single-page application built to manage industrial or manufacturing workflows. It streamlines the tracking of raw materials, the composition of final products, and automated production planning based on current stock levels.

## ✨ Features

* **Raw Material Management:** Perform full CRUD operations to track inventory and stock quantities of base materials.
* **Product Composition (BOM):** Create and manage final products, defining exactly which raw materials (and in what quantities) are required to manufacture them.
* **Intelligent Production Planning:** Automatically calculates how many units of a specific product can be manufactured based on the real-time stock of its required raw materials.
* **Responsive UI:** A clean, mobile-friendly interface designed with Tailwind CSS, ensuring usability across desktops, tablets, and smartphones.

## 🛠️ Technologies Used

* **Front-end:** React.js powered by Vite for fast, optimized builds.
* **Language:** TypeScript for static typing and better developer experience.
* **Styling:** Tailwind CSS for utility-first, responsive design.
* **Icons:** Lucide React.
* **Integration:** Designed to consume a RESTful architecture back-end (e.g., Java/Spring) via asynchronous service calls.

## 📂 Project Structure

A quick look at the core structure of the application:

```text
src/
├── components/       # Reusable UI components (e.g., ProductForm, RawMaterialsForm)
├── services/         # API integration layer (productService, rawMaterialService)
├── types/            # TypeScript interfaces and types (Product, RawMaterial)
└── views/            # Main pages (Products, RawMaterials, ProductionPlan)


🚀 Getting Started 

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and `npm` (or `yarn`/`pnpm`) installed on your machine. 

⚠️ **Important:** This front-end application requires the back-end service to be running to fetch and manage data. You can find the source code and instructions for the back-end here:
👉 **[AutoFlex API Repository](https://github.com/brunomaatias/autoflex-api)**

1. Clone the repository:

git clone [https://github.com/brunomaatias/autoflex-web.git](https://github.com/brunomaatias/autoflex-web.git)

2. Navigate to the project directory:

cd autoflex-web

3. Install the dependencies:

npm install


Running the Application

To start the Vite development server, run:

npm run dev

The application will be available at http://localhost:5173.