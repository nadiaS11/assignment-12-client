import PropTypes from "prop-types";
import Title from "../../Title";
import { imgUpload } from "../../../api/utils";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import MyDropdown from "./../../HeadlessDropdown";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

const AddContest = () => {
  const axiosSecure = useAxiosSecure();
  //   const navigate = useNavigate();
  const { user, loading } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rules: [{ text: "" }, { text: "" }, { text: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rules",
  });
  const selectedTag = watch("tags", "");
  const tags = [
    { value: "Gaming", label: "Gaming" },
    { value: "Medical Contest", label: "Medical Contest" },
    { value: "Business Contest", label: "Business Contest" },
    { value: "Article Writing", label: "Article Writing" },
  ];
  // const [selectedTag, setSelectedTag] = useState("Select Contest type");
  const setSelectedTag = (selectedValue) => {
    setValue("tags", selectedValue);
  };

  const onSubmit = async (data) => {
    const upload = await imgUpload(data?.image[0]);
    const imgUrl = upload.data?.display_url;
    const contest = {
      contestName: data.contestName,
      image: imgUrl,
      contestDetails: data.contestDetails,
      contestPrice: data.contestPrice,
      tags: data.tags,
      award: data.award,
      deadline: data.deadline,
      rules: data.rules,
      status: "pending",
      creator: user?.email,
    };
    // console.log(contest);

    try {
      console.log(contest);
      const res = await axiosSecure.post("/creator-contest", contest);
      console.log(res.data);
      toast.success("Contest added successfully.");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Title>Add A Contest</Title>

      <div className=" max-w-4xl  mx-auto min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-w-4xl mx-auto gap-10 mt-12"
        >
          <div className="flex flex-col gap-2">
            <input
              type="file"
              {...register("image", {
                required: true,
                maxLength: 1,
              })}
              className="file-input file-input-bordered rounded"
            />
            {errors?.image?.type === "required" && (
              <p>This field is required</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                {...register("contestName", {
                  required: true,
                })}
                className="input input-bordered rounded"
                placeholder="Contest name "
              />
              {errors?.name?.type === "required" && (
                <p>This field is required</p>
              )}
            </div>

            {/* Contest Price */}
            <input
              type="text"
              {...register("contestPrice", {
                required: true,
              })}
              className="input input-bordered rounded"
              placeholder="Contest Price"
            />
            {errors?.contestPrice?.type === "required" && (
              <p>This field is required</p>
            )}

            {/* Tags */}
            <div>
              <Listbox value={selectedTag} onChange={setSelectedTag}>
                <Listbox.Button className="select  select-bordered rounded w-full ">
                  <span>{selectedTag || "Select Contest type"}</span>
                </Listbox.Button>
                <Listbox.Options>
                  {tags.map((tag, idx) => (
                    <Listbox.Option
                      className={"text-black p-2"}
                      key={idx}
                      value={tag.value}
                    >
                      {tag.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            {/* <select
              type="text"
              {...register("tags", {
                required: true,
              })}
              className="select select-bordered rounded"
              placeholder="Tags/Type"
            >
              <option value="" disabled className="text-black">
                Select Contest Type/Tags
              </option>
              {tags?.map((tag, idx) => (
                <option key={idx} value={tag?.value}>
                  {tag?.label}
                </option>
              ))}
            </select> */}
            {errors?.tags?.type === "required" && <p>This field is required</p>}

            {/* Award */}
            <input
              type="text"
              {...register("award", {
                required: true,
              })}
              className="input input-bordered rounded"
              placeholder="Award"
            />
            {errors?.award?.type === "required" && (
              <p>This field is required</p>
            )}

            {/* Deadline */}
            <input
              type="date"
              {...register("deadline", {
                required: true,
              })}
              className="input input-bordered rounded"
              placeholder="Deadline"
            />
            {errors?.deadline?.type === "required" && (
              <p>This field is required</p>
            )}
          </div>
          <div className="flex flex-col gap-5">
            {/* Contest Details */}
            <textarea
              {...register("contestDetails", {
                required: true,
              })}
              className="textarea textarea-bordered rounded"
              placeholder="Contest Short Details"
            />
            {errors?.contestDetails?.type === "required" && (
              <p>This field is required</p>
            )}

            {/* <textarea
              {...register("rules", {
                required: true,
              })}
              className="textarea textarea-bordered rounded"
              placeholder="Rules"
            />
            {errors?.rules?.type === "required" && (
              <p>This field is required</p>
            )} */}
            {/* Rules */}
            {fields.map((rule, index) => (
              <div key={rule.id} className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  {...register(`rules[${index}].text`, {
                    required: true,
                  })}
                  className="input input-bordered rounded flex-grow"
                  placeholder={`Rule ${index + 1}`}
                />
                {errors?.rules?.[index]?.text?.type === "required" && (
                  <p>This field is required</p>
                )}
                {fields.length > 3 && (
                  <button
                    className="btn btn-outline w-5"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ text: "" })}
              className=" btn btn-wide p-2 rounded text-white bg-yellow-600"
            >
              Add Rule
            </button>
          </div>

          <input
            type="submit"
            value={"Add Contest"}
            className="btn btn-block text-lg bg-slate-800 text-white hover:bg-slate-600"
          />
        </form>
      </div>
    </div>
  );
};

AddContest.propTypes = {};

export default AddContest;
