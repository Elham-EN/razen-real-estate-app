import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import ErrorMessage from "../components/ErrorMessage";

interface FormDataType {
  type: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  address: string;
  description: string;
  offer: boolean;
  regularPrice: number;
  discountedPrice: number;
  /**
   * The type FileList | null is used because when the user selects
   * images from their computer, the input element will return a FileList
   * object representing the selected files. However, if the user doesn't
   * select any files or cancels the file selection, the value of the input
   * element will be null
   */
  images: FileList | null;
}

const FormData: FormDataType = {
  type: "rent",
  name: "",
  bedrooms: 1,
  bathrooms: 1,
  parking: false,
  furnished: false,
  address: "",
  description: "",
  offer: false,
  regularPrice: 0,
  discountedPrice: 0,
  images: null,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(10).max(32),
  bedrooms: Yup.number().min(1).max(25).positive(),
  bathrooms: Yup.number().min(1).max(15).positive(),
  address: Yup.string().required("address is required"),
  description: Yup.string().required("description is required"),
  regularPrice: Yup.number().required().positive().min(50).max(50000000),
  discountedPrice: Yup.number().positive(),
});

export default function CreateListing() {
  const formik = useFormik<FormDataType>({
    initialValues: {
      ...FormData,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("FormData: ", values);
    },
  });

  useEffect(() => {
    console.log("Hello There");
    console.log(formik.values);
    console.log(formik.errors);
  }, [formik.values, formik.errors]);

  return (
    <div className="max-w-md mx-auto px-2 mb-20">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
      <form onSubmit={formik.handleSubmit}>
        <p className="text-lg mt-8 font-semibold">Sell / Rent</p>
        <div className="w-full flex gap-8">
          <button
            type="button"
            onClick={() => formik.setFieldValue("type", "sale")}
            className={`${
              formik.values.type === "rent"
                ? "bg-white"
                : "bg-slate-600 text-white"
            } w-full mt-1 py-3 uppercase rounded-lg 
              shadow-md font-semibold transition duration-150 ease-in-out 
              hover:shadow-xl focus:shadow-xl`}
          >
            Sell
          </button>
          <button
            type="button"
            onClick={() => formik.setFieldValue("type", "rent")}
            className={`${
              formik.values.type === "sale"
                ? "bg-white"
                : "bg-slate-600 text-white"
            } w-full mt-1 py-3 uppercase rounded-lg 
              shadow-md font-semibold transition duration-150 ease-in-out 
              hover:shadow-xl focus:shadow-xl`}
          >
            Rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          type="text"
          className="w-full border-gray-200 rounded py-3 text-lg shadow-md 
             transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white"
          placeholder="Name"
          value={formik.values.name}
          onChange={(e) => {
            formik.setFieldValue("name", e.target.value);
          }}
        />
        {formik.touched.name && <ErrorMessage data={formik.errors.name} />}
        <div className="mt-6 flex justify-start items-center gap-8">
          <div>
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              value={formik.values.bedrooms}
              onChange={(e) => formik.setFieldValue("bedrooms", e.target.value)}
              className="w-20 border-gray-200 rounded shadow-md"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Baths</p>
            <input
              type="number"
              value={formik.values.bathrooms}
              onChange={(e) =>
                formik.setFieldValue("bathrooms", e.target.value)
              }
              className="w-20 border-gray-200 rounded shadow-md"
            />
          </div>
        </div>
        {formik.touched.bedrooms && (
          <ErrorMessage data={formik.errors.bedrooms} />
        )}
        {formik.touched.bathrooms && (
          <ErrorMessage data={formik.errors.bathrooms} />
        )}
        <div className="mt-7">
          <p className="text-lg mt-6 font-semibold">Parking Spot</p>
          <div className="flex gap-5">
            <button
              type="button"
              onClick={() => formik.setFieldValue("parking", true)}
              className={`w-full mt-1 py-3 uppercase rounded-lg 
              shadow-md font-semibold transition duration-150 ease-in-out 
              hover:shadow-xl focus:shadow-xl ${
                !formik.values.parking
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              yes
            </button>
            <button
              type="button"
              id="parking"
              onClick={() => formik.setFieldValue("parking", false)}
              className={`bg-white w-full mt-1 py-3 ml-3 uppercase rounded-lg 
              shadow-md font-semibold transition duration-150 ease-in-out 
              hover:shadow-xl focus:shadow-xl ${
                formik.values.parking
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              no
            </button>
          </div>
        </div>
        <div className="mt-7">
          <p className="text-lg mt-6 font-semibold">Furnished</p>
          <div className="flex gap-5">
            <button
              type="button"
              onClick={() => formik.setFieldValue("furnished", true)}
              className={`w-full mt-1 py-3 uppercase rounded-lg 
              shadow-md font-semibold transition duration-150 ease-in-out 
              hover:shadow-xl focus:shadow-xl ${
                !formik.values.furnished
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              yes
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldValue("furnished", false)}
              className={`bg-white w-full mt-1 py-3 ml-3 uppercase rounded-lg 
              shadow-md font-semibold transition duration-150 ease-in-out 
              hover:shadow-xl focus:shadow-xl ${
                formik.values.furnished
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              no
            </button>
          </div>
        </div>
        <div className="mt-6 ">
          <p className="text-lg mt-6 font-semibold">Address</p>
          <textarea
            value={formik.values.address}
            id="address"
            onChange={(e) => formik.setFieldValue("address", e.target.value)}
            className="w-full  border-gray-200 rounded text-lg text-gray-700 
              shadow-md"
            placeholder="location"
          />
        </div>
        {formik.touched.address && (
          <ErrorMessage data={formik.errors.address} />
        )}
        <div className="mt-6 ">
          <p className="text-lg mt-6 font-semibold">Description</p>
          <textarea
            value={formik.values.description}
            id="description"
            onChange={(e) =>
              formik.setFieldValue("description", e.target.value)
            }
            className="w-full  border-gray-200 rounded text-lg text-gray-700 
              shadow-md"
            placeholder="description"
          />
        </div>
        {formik.touched.description && (
          <ErrorMessage data={formik.errors.description} />
        )}
        <div className="mt-7">
          <p className="text-lg mt-6 font-semibold">Offer</p>
          <div className="flex gap-5">
            <button
              type="button"
              onClick={() => formik.setFieldValue("offer", true)}
              className={`w-full mt-1 py-3 uppercase rounded-lg 
              shadow-md font-semibold transition duration-150 ease-in-out 
              hover:shadow-xl focus:shadow-xl ${
                !formik.values.offer
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              yes
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldValue("offer", false)}
              className={`bg-white w-full mt-1 py-3 ml-3 uppercase rounded-lg 
              shadow-md font-semibold transition duration-150 ease-in-out 
              hover:shadow-xl focus:shadow-xl ${
                formik.values.offer
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              no
            </button>
          </div>
        </div>
        <div className="mt-10 flex flex-col  items-start gap-10">
          <div className="flex gap-10 items-center">
            <div>
              <p className="text-lg font-semibold">Regular Price</p>
              <input
                type="number"
                value={formik.values.regularPrice}
                onChange={(e) =>
                  formik.setFieldValue("regularPrice", e.target.value)
                }
                className="w-30 border-gray-200 rounded shadow-md"
              />
            </div>
            <div className="mt-6">$ / Month</div>
          </div>
          {formik.touched.regularPrice && (
            <ErrorMessage data={formik.errors.regularPrice} />
          )}
          <div>
            <p className="text-lg font-semibold">Discounted Price</p>
            <input
              type="number"
              value={formik.values.discountedPrice}
              onChange={(e) =>
                formik.setFieldValue("discountedPrice", e.target.value)
              }
              className="w-30 border-gray-200 rounded shadow-md"
            />
          </div>
          {formik.touched.discountedPrice && (
            <ErrorMessage data={formik.errors.discountedPrice} />
          )}
        </div>
        <div className="mt-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">
            The first image will be the cover (max 6)
          </p>
          <DropzoneArea
            filesLimit={6}
            acceptedFiles={["image/*"]}
            dropzoneText={"Drag and drop an image here or click"}
            onChange={(files) => formik.setFieldValue("images", files)}
          />
        </div>
        <button
          type="submit"
          className="mt-10 bg-blue-600 w-full py-3 uppercase rounded-lg 
          shadow-md font-semibold transition duration-500 ease-in-out 
          hover:shadow-xl hover:bg-blue-800 focus:shadow-xl text-white"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}
