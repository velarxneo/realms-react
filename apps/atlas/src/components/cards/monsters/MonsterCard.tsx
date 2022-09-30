import {
  OrderIcon,
  Tabs,
  ResourceIcon,
  Button,
  Card,
} from '@bibliotheca-dao/ui-lib';
// import { Tooltip } from '@bibliotheca-dao/ui-lib/base/utility';
import Castle from '@bibliotheca-dao/ui-lib/icons/castle.svg';
import Crown from '@bibliotheca-dao/ui-lib/icons/crown.svg';
// import Globe from '@bibliotheca-dao/ui-lib/icons/globe.svg';
// import Library from '@bibliotheca-dao/ui-lib/icons/library.svg';
// import Monster from '@bibliotheca-dao/ui-lib/icons/monster.svg';
// import Relic from '@bibliotheca-dao/ui-lib/icons/relic.svg';
// import Scroll from '@bibliotheca-dao/ui-lib/icons/scroll-svgrepo-com.svg';
// import Sickle from '@bibliotheca-dao/ui-lib/icons/sickle.svg';
import { HeartIcon } from '@heroicons/react/20/solid';
import { useStarknet } from '@starknet-react/core';
import React, {
  forwardRef,
  ReactElement,
  useImperativeHandle,
  useState,
  useMemo,
} from 'react';
import {
  // MonsterHistory,
  MonsterOverview,
  // Travel,
  // MonsterLore,
} from '@/components/panels/Monsters/details';
import { useMonsterContext } from '@/context/MonsterContext';
import { useEnsResolver } from '@/hooks/useEnsResolver';
import { useUiSounds, soundSelector } from '@/hooks/useUiSounds';
import { useWalletContext } from '@/hooks/useWalletContext';
import {
  isFavourite,
  isYourMonster,
  MonsterOwner,
  MonsterStatus,
} from '@/shared/Getters/Monster';
import { shortenAddressWidth } from '@/util/formatters';
import type { MonstersCardProps } from '../../../types';

// import { MonsterResources } from '@/components/tables/MonsterResources';

export const MonsterCard = forwardRef<any, MonstersCardProps>(
  (props: MonstersCardProps, ref) => {
    const { play } = useUiSounds(soundSelector.pageTurn);
    const { account } = useWalletContext();
    const { account: starkAccount } = useStarknet();
    const {
      state: { favouriteMonsters },
      actions,
    } = useMonsterContext();
    const ensData = useEnsResolver(props.monster?.owner as string);

    const tabs = useMemo(
      () => [
        {
          label: <Castle className="self-center w-6 h-6 fill-current" />,
          component: <MonsterOverview {...props} />,
        },
        // {
        //   label: <Sickle className="self-center w-6 h-6 fill-current" />,
        //   component: (
        //     <MonsterResources
        //       showRaidable
        //       showClaimable
        //       monster={props.monster}
        //       loading={props.loading}
        //     />
        //   ),
        // },
        // {
        //   label: <Globe className="self-center w-6 h-6 fill-current" />,
        //   component: <Travel monster={props.monster} />,
        // },
        // {
        //   label: <Scroll className="self-center w-6 h-6 fill-current" />,
        //   component: <MonsterHistory monsterId={props.monster.monsterId} />,
        // },
        // {
        //   label: <Library className="self-center w-6 h-6 fill-current" />,
        //   component: (
        //     <MonsterLore
        //       monsterName={props.monster.name || ''}
        //       monsterId={props.monster.monsterId || 0}
        //     />
        //   ),
        // },
      ],
      [props.monster?.monsterId]
    );

    const [selectedTab, setSelectedTab] = useState(0);

    useImperativeHandle(ref, () => ({
      selectTab(index) {
        setSelectedTab(index);
      },
    }));

    const pressedTab = (index) => {
      play();
      setSelectedTab(index as number);
    };

    return (
      <Card ref={ref}>
        <div className="flex justify-between">
          <h4 className="flex">
            <Crown className="self-center w-5 h-5 mr-4 fill-white" />{' '}
            {isYourMonster(props.monster, account, starkAccount || '')
              ? 'ser'
              : shortenAddressWidth(props.monster.owner, 6)}
          </h4>
          <div className="flex items-center self-center">
            {!isFavourite(props.monster, favouriteMonsters) && (
              <Button
                size="xs"
                variant="unstyled"
                onClick={() =>
                  actions.addFavouriteMonster(props.monster.monsterId)
                }
              >
                <HeartIcon className="w-6 fill-black stroke-white/50 hover:fill-current" />
              </Button>
            )}{' '}
            {isFavourite(props.monster, favouriteMonsters) && (
              <Button
                size="xs"
                variant="unstyled"
                className="w-full"
                onClick={() =>
                  actions.removeFavouriteMonster(props.monster.monsterId)
                }
              >
                <HeartIcon className="w-6" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <h2>
            <span className="opacity-50">{props.monster.monsterId}</span> |{' '}
            {props.monster.name}{' '}
          </h2>
          {props.monster.owner && (
            <h3 className="self-center my-2 ml-auto">
              {shortenAddressWidth(props.monster.owner, 6)}
            </h3>
          )}
          {/* <div className="self-center">
            <OrderIcon
              size="md"
              order={props.monster.orderType.toLowerCase()}
            />
          </div> */}
        </div>

        <hr className="mt-3 border border-white/30" />
        {/* <h6>{MonsterStatus(props.monster)}</h6> */}
        <Tabs
          selectedIndex={selectedTab}
          onChange={(index) => pressedTab(index as number)}
          variant="default"
        >
          <Tabs.List className="">
            {tabs.map((tab, index) => (
              <Tabs.Tab key={index}>{tab.label}</Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Panels>
            {tabs.map((tab, index) => (
              <Tabs.Panel key={index}>{tab.component}</Tabs.Panel>
            ))}
          </Tabs.Panels>
        </Tabs>
      </Card>
    );
  }
);

MonsterCard.displayName = 'MonsterCard';
