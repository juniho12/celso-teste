import { Repository } from "../../types/repository";
import { COLORS } from "../../utils/const";
import { truncateText } from "../../utils/utils";
import { Card, CardContent, CardHeader } from "./Card.style";

interface RepositoryCardProps {
  repository: Repository;
  colorIndex: number;
}

export default function RepositoryCard({
  repository,
  colorIndex,
}: RepositoryCardProps) {
  const color = COLORS[colorIndex % COLORS.length];
  
  return (
    <Card>
      <CardHeader className="card-header" $bgColor={color}>
        <img src="/logo.png" alt="Logo" width={70} height={70} />
      </CardHeader>
      <CardContent className="card-content">
        <h2>
          <span className="truncated-name">{truncateText(repository.name, 15)}</span>
        </h2>
        {repository.description && (
          <p>{truncateText(repository.description, 50)}</p>
        )}
      </CardContent>

    </Card>
  );
}
