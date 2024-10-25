import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { rgba } from "polished";
import { ChevronDown, Folder, Bookmark, Search } from "react-feather";

  
  const Breadcrumb = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    cursor: pointer;
  `;
  
  const BreadcrumbItem = styled.div`
    font-size: 16px;
    color: #6B7280;
  `;
  
  const BreadcrumbSeparator = styled.div`
    font-size: 16px;
    color: #6B7280;
  `;
  
  const FolderSection = styled.div`
    margin-bottom: 0;
  `;
  
  const BookmarkSection = styled.div``;
  
  
  
  const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `;
  
  const slideIn = keyframes`
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  `;
  
  
  const BookmarkList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
  list-style-type: none;
  padding: 20px;
`;

const FolderCardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(144px, 1fr));
  gap: 25px;
  list-style-type: none;
  padding: 20px;
`;

const BookmarkCard = styled.li`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 20px ${rgba(0, 0, 0, 0.1)};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 15px 30px ${rgba(139, 92, 246, 0.2)};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${rgba(139, 92, 246, 0.2)}, transparent);
    border-radius: 15px;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  animation: ${slideIn} 0.5s ease-out;
`;

const FolderCard = styled(BookmarkCard)`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 20px ${rgba(0, 0, 0, 0.1)};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  cursor: pointer;
  
  &:hover {
    transform: rotateY(5deg) translateY(-15px);
    box-shadow: 0 15px 30px ${rgba(139, 92, 246, 0.2)};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${rgba(139, 92, 246, 0.2)}, transparent);
    border-radius: 15px;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  animation: ${slideIn} 0.5s ease-out;
`;
  

  
const BookmarkTitle = styled.div`
  font-weight: 600;
  margin: 15px 0 10px;
  color: #333;
  font-size: 18px;
  position: relative;
  z-index: 1;
  height: 2.4em; // Set a fixed height for two lines (adjust if needed)
  line-height: 1.2em; // Set line height to match the height
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; // Limit to 2 lines
  -webkit-box-orient: vertical;
  text-overflow: ellipsis; // Add ellipsis for overflowing text
`;

const BookmarkUrl = styled.div`
  color: #666;
  font-size: 14px;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #8B5CF6;
    transition: width 0.3s ease;
  }

  ${BookmarkCard}:hover &::after {
    width: 100%;
  }
`;
  
  

const LogoText = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #8B5CF6;
  letter-spacing: 0.5px;
`;

const FolderList = styled(motion.ul)`
  list-style-type: none;
  padding: 0;
`;

const FolderItem = styled(motion.li)`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  margin-bottom: 8px;
  background-color: ${rgba(139, 92, 246, 0.05)};

  &:hover {
    background-color: ${rgba(139, 92, 246, 0.1)};
    transform: translateY(-2px);
  }
`;

const FolderTitle = styled.span`
  font-size: 15px;
  color: #4B5563;
  font-weight: 500;
  flex-grow: 1;
  transition: color 0.3s ease;

  ${FolderItem}:hover & {
    color: #8B5CF6;
  }
`;

const SubFolderList = styled(motion.ul)`
  list-style-type: none;
  padding-left: 35px;
  margin-top: 8px;
`;

const ChevronIcon = styled(ChevronDown)`
  color: #8B5CF6;
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;

  ${FolderItem}:hover & {
    transform: rotate(-180deg);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f3f0ff;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 320px;
  margin: 20px 0;
  margin-right: 40px;
  margin-bottom: 60px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 10px 20px ${rgba(139, 92, 246, 0.1)};
  overflow-y: auto;
  height: calc(100vh - 40px);
  position: sticky;
  top: 20px;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 30px ${rgba(139, 92, 246, 0.15)};
  }
    /* 隐藏滚动条 */
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    display: none;  /* WebKit */
  }
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid ${rgba(139, 92, 246, 0.1)};
`;



const FolderIcon = styled(Folder)`
  margin-right: 15px;
  color: #8B5CF6;
`;


const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  margin-bottom: 0px;
  box-shadow: 0 2px 10px ${rgba(0, 0, 0, 0.1)};

  input {
    border: none;
    outline: none;
    font-size: 16px;
    width: 100%;
    margin-left: 10px;
  }
`;

const SearchIcon = styled(Search)`
  color: #8B5CF6;
`;

const BookmarkIcon = styled.div`
  height: 60px;
  color: #8B5CF6;
`;

const FolderItemIcon = styled(Folder)`
  width: 60px;
  height: 60px;
  color: #8B5CF6;
`;

const BookmarkItemIcon = styled(Bookmark)`
  width: 40px;
  height: 40px;
  color: #8B5CF6;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  
  h1 {
    font-size: 28px;
    color: #4B5563;
    margin-bottom: 20px;
    border-bottom: 2px solid ${rgba(139, 92, 246, 0.2)};
    padding-bottom: 10px;
  }

  animation: ${fadeIn} 0.5s ease-out;
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 16px 0;
`;



export {
  Sidebar,
  LogoContainer,
  LogoText,
  FolderList,
  FolderItem,
  FolderIcon,
  FolderTitle,
  SubFolderList,
  ChevronIcon,
  MainContent,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  SearchBar,
  BookmarkList,
  BookmarkCard,
  BookmarkIcon,
  BookmarkTitle,
  BookmarkUrl,
  FolderSection,
  BookmarkSection,
  FolderItemIcon,
  BookmarkItemIcon,
  FolderCard,
  FolderCardList
};