"use client";
import { API } from "@/app/utils/helpers";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { Suspense, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
interface CustomFile {
  file: File;
  url: string;
}
const PageContent = () => {
  const search = useSearchParams();
  const userId = search.get("userId");
  const collectionId = search.get("collectionId");
  const [productname, setProductname] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [discountedprice, setDiscountedprice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [weight, setWeight] = useState("");
  const [images, setImages] = useState<CustomFile[]>([]);
  const router = useRouter();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return; // Ensure files exist

    const files = Array.from(e.target.files);
    const maxSize = 0.5 * 1024 * 1024; // 1MB in bytes
    let validImages: CustomFile[] = [];

    files.forEach((file) => {
      if (file?.size > maxSize) {
        alert(`"${file.name}" is larger than 500KB and was not added.`);
      } else {
        validImages.push({
          file,
          url: URL.createObjectURL(file),
        });
      }
    });

    if (images.length + validImages.length > 5) {
      alert("You can only upload up to 5 images.");
      validImages = validImages.slice(0, 5 - images.length);
    }

    setImages((prevImages) => [...prevImages, ...validImages]);
  };
  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const addproduct = async () => {
    if (images.length === 0) {
      toast.error("Please upload at least one image before proceeding.");
      return;
    }
    try {
      const formData = new FormData();

      // Append product details
      formData.append("name", productname);
      formData.append("description", desc);
      formData.append("weight", weight);
      // formData.append("images", images);
      images.forEach((image) => {
        formData.append("images", image.file);
      });
      const res = await axios.post(
        `${API}/addProduct/${userId}/${collectionId}`,
        formData,
        {
          params: {
            price: price,
            discountPrice: discountedprice,
            quantity: quantity,
          },
        }
      );
      if (res?.data?.success) {
        toast.success("Upload successful!");
        router.back();
        setImages([]);
      }
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <div className="h-full w-full flex pn:max-md:flex-col">
      <Toaster />
      <div className="w-[50%] pn:max-md:w-full pn:max-md:h-full p-2 space-y-2">
        {/* general information section */}
        <div className="p-2 border bg-white rounded-xl">
          <div className="flex flex-row w-[100%] justify-between">
            <div className="font-semibold text-[18px] p-1">
              General information
            </div>
            <div
              onClick={addproduct}
              className="font-semibold bg-blue-600 text-white  text-[18px] px-4 py-2 rounded-xl"
            >
              Add Product
            </div>
          </div>
          <div className="p-1">
            <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
              Product Name <div>(0/100)</div>
            </div>
            <input
              value={productname}
              onChange={(e) => {
                setProductname(e.target.value);
              }}
              type="text"
              placeholder="Product Name"
              className="p-1 w-full border rounded-lg"
            />
          </div>
          <div className="p-1">
            <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
              Product Description <div>(0/200)</div>
            </div>
            <textarea
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              placeholder="Product description"
              className="p-1 h-[100px] w-full border rounded-lg"
            />
          </div>
        </div>
        {/* media section */}
        <div className="p-2 border bg-white rounded-xl">
          <div className="font-semibold flex gap-1 items-center text-[18px] p-1">
            Media
            <div className="text-[14px] text-slate-600">
              (Images, video or 3D models)
            </div>
          </div>
          <div className="p-1 w-full flex flex-col items-center space-y-2 justify-center">
            <div className="text-[14px] w-full text-start flex justify-between items-center font-semibold text-slate-600">
              Add Media Name<div>(0/5)</div>
            </div>
            <div className="flex gap-2 items-center flex-wrap ">
              {images.map((image, index) => (
                <div key={index} className="relative w-[100px] h-[100px]">
                  <img
                    src={image.url}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2"
                    onClick={() => removeImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="p-1 border rounded-lg h-[100px] w-[100px] flex items-center justify-center"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[50%] pn:max-md:w-full pn:max-md:h-full p-2 space-y-2 ">
        {/* Pricing section  */}
        <div className="p-2 border bg-white rounded-xl">
          <div className="font-semibold text-[18px] p-1">Pricing</div>
          <div className="flex pn:max-md:flex-col gap-2 w-full">
            <div className="p-1 w-full">
              <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
                Selling price
              </div>
              <input
                value={price}
                type="Number"
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                }}
                placeholder="Product M.R.P"
                className="p-1 w-full border rounded-lg"
              />
            </div>
            <div className="p-1  w-full">
              <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
                Discount price
              </div>
              <input
                value={discountedprice}
                type="Number"
                onChange={(e) => {
                  setDiscountedprice(Number(e.target.value));
                }}
                placeholder="Product Discount"
                className="p-1 w-full border rounded-lg"
              />
            </div>
          </div>
          <div className="p-1 pn:max-md:w-full md:w-[50%]">
            <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
              Quantity
            </div>
            <input
              value={quantity}
              type="Number"
              onChange={(e) => {
                setQuantity(Number(e.target.value));
              }}
              placeholder="Product In Stock"
              className="p-1 w-full border rounded-lg"
            />
          </div>
          <div className="p-1 w-full gap-2 flex items-center">
            <input
              type="checkbox"
              className="bg-[#5570F1] h-[15px] w-[15px] "
            />
            <div className="text-[16px] font-medium flex justify-between items-center text-[#5570F1]">
              This product includes GST
            </div>
          </div>
        </div>
        {/* Shipping section  */}
        <div className="p-2 border bg-white rounded-xl">
          <div className="font-semibold text-[18px] p-1">Shipping</div>

          <div className="p-1 w-full gap-2 flex items-center">
            {/* switcher  */}
            {/* <div
              onClick={() => setYes(!yes)}
              className="h-[20px] w-[40px] rounded-xl bg-[#5570F1] relative "
            >
              <div
                className={` h-[18px] w-[18px] duration-150 bg-white rounded-3xl absolute ${
                  !yes
                    ? " right-[1px] left-auto top-[1.2px] "
                    : " left-[1px] right-auto top-[1.2px] "
                }`}
              ></div>
            </div> */}
            {/* ---  */}
            <div className="text-[16px] flex justify-between items-center font-medium text-[#5570F1]">
              This product shipped by Grovyo
            </div>
          </div>
          <div className="flex pn:max-md:flex-col gap-2 w-full">
            <div className="p-1 w-full">
              <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
                Weight
              </div>
              <input
                type="text"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
                placeholder="In Kgs"
                className="p-1 w-full border rounded-lg"
              />
            </div>
            <div className="p-1  w-full">
              <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
                Height
              </div>
              <input
                type="Number"
                placeholder="Product height"
                className="p-1 w-full border rounded-lg"
              />
            </div>
          </div>
        </div>
        {/* Different Options section  */}
        <div className="p-2 border bg-white rounded-xl">
          <div className="font-semibold text-[18px] p-1">Variant Options</div>
          <div className="p-1 w-full gap-2 flex items-center">
            <input
              type="checkbox"
              className="bg-[#5570F1] h-[15px] w-[15px] "
            />
            <div className="text-[16px] flex justify-between font-medium items-center ">
              This product has variants
            </div>
          </div>
          <div className="flex pn:max-md:flex-col gap-2 w-full">
            <div className="p-1 w-full">
              <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
                Type
              </div>
              <input
                type="Number"
                placeholder="Product M.R.P"
                className="p-1 w-full border rounded-lg"
              />
            </div>
            <div className="p-1  w-full">
              <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
                Value
              </div>
              <input
                type="Number"
                placeholder="Product Discount"
                className="p-1 w-full border rounded-lg"
              />
            </div>
          </div>
          <div className="p-1 hover:underline cursor-pointer font-medium text-[#5570F1] text-[16px] flex justify-between items-center ">
            Add More
          </div>
        </div>
      </div>
    </div>
  );
};
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};
export default Page;
