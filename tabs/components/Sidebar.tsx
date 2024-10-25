import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "react-feather";
import { LogoIcon } from "./Icons";
import {
  Sidebar as StyledSidebar,
  LogoContainer,
  LogoText,
  FolderList,
  FolderItem,
  FolderIcon,
  FolderTitle,
  SubFolderList,
  ChevronIcon,
} from "./StyledComponents";



const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const Sidebar = ({ sidebarFolders, expandedFolders, toggleFolder, selectedFolderId, setSelectedFolderId }) => {

  const renderFolders = (node, depth = 0) => {
    if (!node.url) {
      return (
        <motion.div key={node.id} variants={itemVariants}>
          <FolderItem
            onClick={() => {
              toggleFolder(node.id);
              setSelectedFolderId(node.id);
            }}
            style={{
              paddingLeft: `${depth * 15 + 15}px`,
              backgroundColor: selectedFolderId === node.id ? "#e0e0e0" : "transparent",
            }}
          >
            <FolderIcon>{/* Add folder icon here */}</FolderIcon>
            <FolderTitle>{node.title}</FolderTitle>
            {node.children && node.children.length > 0 && (
              <ChevronIcon
                style={{
                  transform: expandedFolders[node.id]
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            )}
          </FolderItem>
          {expandedFolders[node.id] && node.children && (
            <SubFolderList
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {node.children
                .filter((child) => !child.url)
                .map((child) => renderFolders(child, depth + 1))}
            </SubFolderList>
          )}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <StyledSidebar
    >
      <LogoContainer variants={itemVariants}>
        <LogoIcon />
        <LogoText>Bookmarks Artist</LogoText>
      </LogoContainer>
      <FolderList variants={itemVariants}>
        {sidebarFolders.map((folder) => renderFolders(folder))}
      </FolderList>
    </StyledSidebar>
  );
};

export default Sidebar;