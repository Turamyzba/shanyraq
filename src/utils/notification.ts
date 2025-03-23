import { addToast } from "@heroui/react";

type Props = {
  title: string;
  description: string;
  color: "success" | "danger";
};

export function showToast({ title = "", description = "", color = "success" }: Props) {
  addToast({
    title: title,
    description: description,
    variant: "flat",
    radius: "sm",
    timeout: 5000,
    color: color,
  });
}
