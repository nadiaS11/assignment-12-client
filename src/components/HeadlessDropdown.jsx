import PropTypes from "prop-types";

import { Menu } from "@headlessui/react";
import { FaBaby, FaBacon, FaBusinessTime, FaFileMedical } from "react-icons/fa";

const MyDropdown = ({ tags }) => {
  return (
    <Menu>
      <Menu.Button>Select Contest Type</Menu.Button>
      <Menu.Items>
        {tags?.map((tag, idx) => (
          <Menu.Item key={idx}>
            {({ active }) => (
              <option
                value={tag?.value}
                className={`${
                  active ? " bg-gray-300 text-white" : "text-gray-900"
                } group w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                {tag?.label}
              </option>
            )}
          </Menu.Item>
        ))}

        {/* <Menu.Item>
          {({ active }) => (
            <option
              className={`${
                active ? " bg-gray-300 text-white" : "text-gray-900"
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              Business Contest
            </option>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <option
              value={"Gaming"}
              className={`${
                active ? " bg-gray-300 text-white" : "text-gray-900"
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              Gaming
            </option>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <option
              value={"Article Writing"}
              className={`${
                active ? " bg-gray-300 text-white" : "text-gray-900"
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              Article Writing
            </option>
          )}
        </Menu.Item> */}
      </Menu.Items>
    </Menu>
  );
};

MyDropdown.propTypes = {
  tags: PropTypes.array,
};

export default MyDropdown;
