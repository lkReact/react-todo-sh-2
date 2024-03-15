import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Redirect({ to }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

export function isImage(url: string | null | undefined): boolean {
  if (!url) return false;
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
