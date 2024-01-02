import React, { useState } from "react";
import SavedCartList from "./SavedCartList";
import { MdOutlineSwitchLeft, MdOutlineSwitchRight } from "react-icons/md";
import PlacedOrder from "./PlacedOrder";

const Profile = () => {
  const [view, setView] = useState(false);
  return (
    <>
      <div className="w-[95%] mx-auto cursor-pointer">
        <div>
          {view && (
            <>
              <h1
                className="flex items-center gap-2 uppercase mt-[20px] border-l-[5px] border-red-400"
                onClick={() => setView(!view)}
              >
                Placed Order <MdOutlineSwitchRight />
              </h1>
              <SavedCartList />
            </>
          )}
        </div>

        <div>
          {!view && (
            <>
              <h1
                className="flex items-center gap-2 uppercase mt-[20px] border-l-[5px] border-red-400"
                onClick={() => setView(!view)}
              >
                Saved Cart Items <MdOutlineSwitchLeft />
              </h1>
              <PlacedOrder />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
