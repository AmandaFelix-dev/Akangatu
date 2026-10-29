import baseImage from '../../assets/layout/main-background.webp'
import wideBaseImage from '../../assets/layout/main-background-wider.webp'
import styles from './MainBackground.module.css'

export function MainBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <picture>
        <source media="(min-width: 768px)" srcSet={wideBaseImage} />
        <img className={styles.base} src={baseImage} alt="" />
      </picture>
    </div>
  )
}
