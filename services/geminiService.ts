
import { GoogleGenAI, Type } from "@google/genai";
import { JobListing, WorkerProfile, ServiceInfo, ServiceProvider } from "../types";
import { SERVICES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const workerSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The full name of the service worker.",
      },
      applyServices: {
        type: Type.ARRAY,
        description: `A list of 1 to 3 services the worker provides, chosen from this list: ${SERVICES.join(
          ", "
        )}.`,
        items: {
          type: Type.STRING,
        },
      },
      mobile: {
        type: Type.STRING,
        description:
          "A realistic, fictional 10-digit mobile phone number.",
      },
      country: {
        type: Type.STRING,
        description: "The country where the worker is based.",
      },
    },
    required: ["name", "applyServices", "mobile", "country"],
  },
};

const jobSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            name: {
                type: Type.STRING,
                description: 'The full name of the customer posting the job.',
            },
            mobile: {
                type: Type.STRING,
                description: 'A realistic, fictional 10-digit mobile phone number.',
            },
            country: {
                type: Type.STRING,
                description: 'The country where the customer is located.',
            },
            serviceNeeded: {
                type: Type.STRING,
                description: `The specific service the customer requires, chosen from this list: ${SERVICES.join(', ')}.`,
            },
        },
        required: ['name', 'mobile', 'country', 'serviceNeeded'],
    },
};

const serviceOptionsSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.STRING,
        description: "A specific type of the requested service."
    }
}

const serviceDescriptionSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "A professional and engaging title for the service. For example, 'Expert Home Cleaning Services'."
        },
        description: {
            type: Type.STRING,
            description: "A detailed, customer-friendly paragraph (3-4 sentences) describing what the service includes. Mention key activities the professional will perform. For example, for cleaning, mention dusting, mopping, kitchen and bathroom cleaning."
        },
        keyFeatures: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-5 key benefits or included tasks of the service, written as short, impactful bullet points."
        }
    },
    required: ["title", "description", "keyFeatures"]
}

const serviceProviderSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.STRING, description: "A unique ID for the provider, like a UUID." },
            name: { type: Type.STRING, description: "A realistic, fictional business or professional name, e.g., 'Sparkle Home Cleaners' or 'Reliable Plumbing Co.'." },
            contact: { type: Type.STRING, description: "A realistic, fictional 10-digit mobile number." },
            image: { type: Type.STRING, description: "A plausible URL for a high-quality, relevant stock photo from Pexels or Unsplash. The image should represent the service provided (e.g., a clean kitchen for cleaning services)." },
            bio: { type: Type.STRING, description: "A short, engaging bio (1-2 sentences) describing their business, e.g., 'Family-owned business with 10+ years of experience in providing top-notch cleaning services.'." },
        },
        required: ["id", "name", "contact", "image", "bio"],
    }
};


export const generateWorkers = async (
  location: string
): Promise<WorkerProfile[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a list of 8 realistic but fictional household service workers based in ${location}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: workerSchema,
      },
    });

    const jsonText = response.text.trim();
    const workers = JSON.parse(jsonText) as WorkerProfile[];
    return workers;
  } catch (error) {
    console.error("Error generating worker data:", error);
    return [];
  }
};

export const generateJobs = async (location: string): Promise<JobListing[]> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate a list of 8 realistic but fictional job opportunities for household services in ${location}.`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: jobSchema,
        },
    });

    const jsonText = response.text.trim();
    const jobs = JSON.parse(jsonText) as JobListing[];
    return jobs;
  } catch (error) {
    console.error('Error generating job data:', error);
    return [];
  }
};

export const generateServiceOptions = async (serviceName: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a list of 3-4 specific, common types of the household service "${serviceName}". For example, for "Cleaning", you could return "Standard Clean", "Deep Clean", "Move-out Clean".`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: serviceOptionsSchema,
            },
        });

        const jsonText = response.text.trim();
        const options = JSON.parse(jsonText) as string[];
        return options.length > 0 ? options : ["General Service"];
    } catch (error) {
        console.error(`Error generating service options for ${serviceName}:`, error);
        // Provide a fallback
        return ["General Service"];
    }
}

export const generateServiceDescription = async (serviceName: string): Promise<ServiceInfo> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a detailed description and 4 key features for the household service: "${serviceName}".`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: serviceDescriptionSchema,
            },
        });

        const jsonText = response.text.trim();
        const info = JSON.parse(jsonText) as ServiceInfo;
        return info;
    } catch (error) {
        console.error(`Error generating service description for ${serviceName}:`, error);
        return {
            title: `About ${serviceName}`,
            description: `Learn more about our professional ${serviceName} services by starting the booking process.`,
            keyFeatures: ["Verified Professionals", "Transparent Pricing", "On-Time Service", "Satisfaction Guaranteed"]
        };
    }
}

export const generateServiceProviders = async (service: string, location: string): Promise<ServiceProvider[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a list of 3 fictional but realistic service providers for "${service}" in ${location}, India.`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: serviceProviderSchema,
            },
        });
        const jsonText = response.text.trim();
        const providers = JSON.parse(jsonText) as ServiceProvider[];
        return providers;
    } catch (error) {
        console.error(`Error generating service providers for ${service}:`, error);
        return [];
    }
};