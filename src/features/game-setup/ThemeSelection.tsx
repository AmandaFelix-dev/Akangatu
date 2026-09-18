import { useState } from 'react';
import { THEMES } from '../../data/themes';
import type { Theme } from '../../types/theme';
import type { GameConfig } from '../../types/game';
import { DifficultySelection } from './DifficultySelection';
export function ThemeSelection({ onStart, onBack }: {
    onStart: (config: GameConfig) => void;
    onBack: () => void;
}) {
    const [selected, setSelected] = useState<Theme | null>(null);
    return <main className="page"><button className="text-button" onClick={onBack}>← Voltar ao início</button><p className="eyebrow">01 / ESCOLHA A COLEÇÃO</p><h1 tabIndex={-1}>Por onde vamos <em>explorar?</em></h1><p className="lead">Cada universo guarda algo para descobrir. Comece pela fauna.</p><div className="theme-grid">{THEMES.map((theme, index) => <button key={theme.id} className={'theme-card ' + (!theme.isUnlocked ? 'locked' : '')} disabled={!theme.isUnlocked} onClick={() => setSelected(theme)}><div className="theme-image"><img src={theme.coverImage} alt={'Ilustração da coleção ' + theme.name}/><span className="badge">{theme.isUnlocked ? 'DISPONÍVEL' : 'BLOQUEADO'}</span></div><div className="theme-caption"><span>0{index + 1} / COLEÇÃO</span><h2>{theme.name} <span>{theme.isUnlocked ? '↗' : '◇'}</span></h2><p>{theme.isUnlocked ? 'Encontros com a beleza da vida selvagem.' : theme.unlockDescription}</p></div></button>)}</div><p className="collection-note">✳ Novas coleções e formas de desbloquear chegam nas próximas etapas.</p>{selected && <DifficultySelection theme={selected} onClose={() => setSelected(null)} onStart={onStart}/>}</main>;
}
