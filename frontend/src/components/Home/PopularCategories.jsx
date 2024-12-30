import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Technology",
     
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Health",
      
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Engineering and Architecture",
      
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "Business and Management",
    
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Social science and humanity",
      
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Teaching",
      
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Social media related",
      
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Science",
     
      icon: <MdOutlineWebhook  />,
    },
    {
      id: 9,
      title: "Adminstrative and support service",
     
      icon: <MdOutlineWebhook  />,
    },
    {
      id: 10,
      title: "Other categories",
     
      icon: <MdAccountBalance />,
    },
  ];
  return (
    <div className="categories">
      <h3> Categories </h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="cardd" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div style={{ color: 'black' }} className="text">
                <p>{element.title}</p>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
