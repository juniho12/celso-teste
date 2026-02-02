import { Repository } from "../../types/repository";
import { COLORS } from "../../utils/const";
import { truncateText } from "../../utils/utils";
import { Card, CardContent, CardHeader, CardLink } from "./Card.style";

interface RepositoryCardProps {
  repository: Repository;
  colorIndex: number;
}

export default function RepositoryCard({
  repository,
  colorIndex,
}: RepositoryCardProps) {
  const color = COLORS[colorIndex % COLORS.length];
  const fullName = repository.name;
  const truncatedName = truncateText(repository.name, 15);
  const fullDescription = repository.description || "Sem descrição disponível";
  const truncatedDescription = truncateText(repository.description || "", 50);
  
  return (
    <Card
      as="article"
      role="article"
      aria-labelledby={`repo-title-${repository.id}`}
    >
      <CardLink
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir repositório ${fullName} no GitHub em nova aba`}
      >
        <CardHeader className="card-header" $bgColor={color} aria-hidden="true">
          <img 
            src="/logo.png" 
            alt="" 
            width={70} 
            height={70}
            role="presentation"
          />
        </CardHeader>
        <CardContent className="card-content">
          <h2 id={`repo-title-${repository.id}`}>
            <span 
              className="truncated-name"
              title={fullName !== truncatedName ? fullName : undefined}
              aria-label={fullName}
            >
              {truncatedName}
            </span>
          </h2>
          {repository.description && (
            <p 
              title={fullDescription !== truncatedDescription ? fullDescription : undefined}
            >
              {truncatedDescription}
            </p>
          )}
        </CardContent>
      </CardLink>
    </Card>
  );
}
