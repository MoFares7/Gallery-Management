export const getCategoryColor = (id: number) => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
    "#F8B739",
    "#52BE80",
    "#E74C3C",
    "#3498DB",
    "#9B59B6",
    "#1ABC9C",
    "#F39C12",
  ];
  return colors[id % colors.length];
};

export const getCategoryIcon = (name: string) => {
  return name.charAt(0).toUpperCase();
};
