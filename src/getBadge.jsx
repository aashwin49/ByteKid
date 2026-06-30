export default function getBadge(points) {
  if (points >= 50) return "🥇 Gold Badge";
  if (points >= 40) return "🥈 Silver Badge";
  if (points >= 20) return "🥉 Bronze Badge";
  return "🔒 No Badge Yet";
}