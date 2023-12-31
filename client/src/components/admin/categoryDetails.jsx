import { XMarkIcon } from "@heroicons/react/24/outline";

const CategoryDetails = ({ text, onDelete }) => {
  return (
    <div className="categoryDetails">
      {text}

      <span className=" absolute left-1 top-1.5 cursor-pointer hover:text-red-600">
        <XMarkIcon
          className="w-5 h-5"
          onClick={()=> onDelete()}
        />
      </span>
    </div>
  );
};

export default CategoryDetails
