const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Check if clients exist
  const count = await prisma.client.count();
  if (count === 0) {
    console.log("Seeding 2 dummy clients...");
    await prisma.client.create({
      data: {
        url: "https://hubspot.com",
        name: "HubSpot",
        industry: "B2B SaaS / CRM",
        products: "Marketing Hub, Sales Hub, Service Hub",
        targetCustomer: "PyMEs y corporativos que buscan alinear marketing y ventas",
        knownCompetitors: "Salesforce, ActiveCampaign, Marketo",
        companyProfile: "HubSpot es una plataforma CRM líder que ofrece software, integraciones y recursos para marketing, ventas y servicio al cliente. Su enfoque principal es la metodología Inbound, atrayendo prospectos de forma orgánica."
      }
    });

    await prisma.client.create({
      data: {
        url: "https://stripe.com",
        name: "Stripe",
        industry: "Fintech / Pasarela de Pagos",
        products: "Payments, Billing, Connect",
        targetCustomer: "Desarrolladores y empresas digitales de cualquier tamaño",
        knownCompetitors: "PayPal, Adyen, Braintree",
        companyProfile: "Stripe es una suite de herramientas de pago y gestión financiera diseñada para negocios en internet. Su propuesta de valor se centra en una API enfocada en desarrolladores, alta conversión y prevención de fraude avanzada."
      }
    });
    console.log("Seeded successfully!");
  } else {
    console.log(`Database already has ${count} clients.`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
