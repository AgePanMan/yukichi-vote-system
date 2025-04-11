export async function getProposals() {
  const res = await fetch('/api/proposals');
  return res.json();
}
