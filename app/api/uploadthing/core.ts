// Code lấy từ trang Getting Started của Upload thing


import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const auth = (req: Request) => ({ id: "fakeId" }); 
// Hàm auth cần chỉnh sửa sau khi thông luồng backend authen

export const ourFileRouter = {
  // Định nghĩa Uploader 
  serverImageUploader: f({ image: { maxFileSize: "4MB" } })

    .middleware(async ({ req }) => {
      const user = await auth(req);
 
      // Xác thực quyền trước khi upload ảnh
      if (!user) throw new UploadThingError("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
 
      // Hàm xử lí log thông tin và trả về userId
      return { uploadedBy: metadata.userId };
    }),
    messageFile : f(["image","pdf"])
    .middleware(async ({ req }) => {
        const user = await auth(req);
        if (!user) throw new UploadThingError("Unauthorized");
        return { userId: user.id };
      } 
    )
    .onUploadComplete(()=>{})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;