import baseImage from '../../assets/layout/main-background.svg'
import styles from './MainBackground.module.css'

export function MainBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <img className={styles.base} src={baseImage} alt="" />
    </div>
  )
}
