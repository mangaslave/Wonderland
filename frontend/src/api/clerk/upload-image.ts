// import Clerk from "@clerk/clerk-sdk-node";


// export async function uploadImage(req: Request): Promise<Response> {
//   if (req.method !== "POST") {
//     return new Response(JSON.stringify({ error: "Method not allowed" }), {
//       status: 405,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const clerk = Clerk();

//   try {
//     const contentType = req.headers.get("content-type") || "";
//     if (!contentType.includes("multipart/form-data")) {
//       throw new Error("Invalid content type");
//     }

//     const formData = await req.formData();
//     const file = formData.get("file");

//     if (!file || !(file instanceof File)) {
//       throw new Error("No file uploaded");
//     }

//     const buffer = await file.arrayBuffer();
//     const mimeType = file.type;

//     const imageUrl = await clerk.uploadUserImage(Buffer.from(buffer), mimeType);

//     return new Response(JSON.stringify({ imageUrl }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return new Response(JSON.stringify({ error: "Failed to upload image" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false, 
//   },
// };
