import { Button } from '@bibliotheca-dao/ui-lib';
import { SearchFilter } from '@/components/filters/SearchFilter';
import { useMonsterContext } from '@/context/MonsterContext';
import { BaseFilter } from './BaseFilter';

type MonstersFilterProps = {
  isYourMonsters: boolean;
};

export function MonstersFilter(props: MonstersFilterProps) {
  const { state, actions } = useMonsterContext();

  return (
    <BaseFilter>

      <div className="md:ml-4">
        <Button variant="outline" size="xs" onClick={actions.clearFilters}>
          Clear <span className="hidden md:block ml-2">Filters</span>
        </Button>
      </div>
    </BaseFilter>
  );
}
