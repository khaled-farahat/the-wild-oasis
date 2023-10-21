import styled from "styled-components";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import useOutsideClick from "@/hooks/useOutsideClick";

type Position = {
  x: number;
  y: number;
};

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

type StyledListProps = {
  position: Position;
};

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenusContextType = {
  openId: string | number;
  close: () => void;
  open: (id: string | number) => void;
  position: Position;
  setPosition: (position: Position) => void;
};

const MenusContext = createContext<MenusContextType>({
  openId: "",
  close: () => {},
  open: () => {},
  position: { x: 0, y: 0 },
  setPosition: () => {},
});

interface MenusProps {
  children: React.ReactNode;
}

const Menus = ({ children }: MenusProps) => {
  const [openId, setOpenId] = useState<string | number>("");
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const close = () => setOpenId("");

  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }: { id: string | number }) => {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    const rect = e.currentTarget.closest("button")?.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - (rect?.width || 0) - (rect?.x || 0),
      y: (rect?.y || 0) + (rect?.height || 0) + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

type ListProps = {
  id: string | number;
  children: React.ReactNode;
};

const List = ({ id, children }: ListProps) => {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

type ButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ children, icon, onClick, disabled }: ButtonProps) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
