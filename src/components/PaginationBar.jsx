// src/components/PaginationBar.jsx
import { Pagination } from "react-bootstrap";

export default function PaginationBar({ currentPage, totalPages, onPageChange }) {
  const items = [];

  for (let i = 1; i <= totalPages; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return <Pagination>{items}</Pagination>;
}
