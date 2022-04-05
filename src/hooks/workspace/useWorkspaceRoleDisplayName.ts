export default function useWorkspaceRoleDisplayName() {
  const getRoleDisplayName = (role: "normal" | "admin") => {
    if (role === "normal") return "Normal Member";
    if (role === "admin") return "Administrator";
  };
  return { getRoleDisplayName };
}
