export default function getBadge(points) {
  if (points >= 100) return "🥇 Gold Badge";
  if (points >= 50) return "🥈 Silver Badge";
  if (points >= 20) return "🥉 Bronze Badge";
  return "🔒 No Badge Yet";
}