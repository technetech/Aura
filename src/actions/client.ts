"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

async function saveFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
  const filepath = path.join(process.cwd(), "public", "uploads", filename);
  await writeFile(filepath, buffer);
  return `/uploads/${filename}`; // URL accesible en Next.js
}

export async function createClient(formData: FormData) {
  try {
    const url = formData.get("url") as string;
    if (!url) {
      return { success: false, error: "La URL es requerida" };
    }

    const existingClient = await prisma.account.findUnique({
      where: { url },
    });

    if (existingClient) {
      return { success: false, error: "Ya existe un cliente con esta URL" };
    }

    // Procesar archivos subidos
    const logoUrl = await saveFile(formData.get("logoFile") as File);
    const manualUrl = await saveFile(formData.get("manualFile") as File);
    const docsUrl = await saveFile(formData.get("docsFile") as File);

    const client = await prisma.account.create({
      data: {
        url,
        name: (formData.get("name") as string) || null,
        location: (formData.get("location") as string) || null,
        industry: (formData.get("industry") as string) || null,
        products: (formData.get("products") as string) || null,
        targetCustomer: (formData.get("targetCustomer") as string) || null,
        knownCompetitors: (formData.get("knownCompetitors") as string) || null,
        businessObjectives: (formData.get("businessObjectives") as string) || null,
        socialMedia: (formData.get("socialMedia") as string) || null,
        logoUrl,
        manualUrl,
        docsUrl,
      },
    });

    // En un escenario real, aquí lanzaríamos un worker para iniciar la extracción (Intelligence)
    // Usando Nvidia NIM o servicios de scraping. Por ahora, mockeamos su éxito.

    revalidatePath("/clients");

    return { success: true, clientId: client.id };
  } catch (error: any) {
    console.error("Error creating client:", error);
    return { success: false, error: error.message };
  }
}

export async function getClients() {
  return prisma.account.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getClientById(id: string) {
  return prisma.account.findUnique({
    where: { id },
    include: {
      brandCore: true,
      insights: true,
      competitors: true,
    }
  });
}

export async function deleteClient(id: string) {
  try {
    await prisma.account.delete({
      where: { id },
    });
    revalidatePath("/clients");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return { success: false, error: "Error al eliminar" };
  }
}
