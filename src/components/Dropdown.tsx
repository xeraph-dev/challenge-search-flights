import './Dropdown.scss'

import { ReactNode } from 'react'
import { FaChevronDown } from 'react-icons/fa'

interface DropdownProps {
  button: ReactNode
  content: ReactNode
  onClose: () => void
  onOpen: () => void
  open: boolean
}

export default function Dropdown({ button, content, onClose, onOpen, open }: DropdownProps) {
  return (
    <div className="dropdown" data-open={open}>
      <div className="dropdown-overlay" onClick={() => onClose()} />
      <div className="dropdown-content">
        <button type="button" onClick={() => (open ? onClose() : onOpen())}>
          {button}
          <FaChevronDown />
        </button>
        <div>{content}</div>
      </div>
    </div>
  )
}
