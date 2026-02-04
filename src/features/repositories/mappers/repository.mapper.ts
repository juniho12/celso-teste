export function mapRepository(repo: any) {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    fullName: repo.full_name,
    html_url: repo.html_url,
  };
}