import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className="row">
        <div className={`${styles.leftCol} col-3 d-flex order-sm-1 order-2`}>
          <div className="d-flex align-items-center ms-auto me-3">
            <span className={styles.logo}>
              i<span className="greenish">Z</span>AM
            </span>
          </div>

          <div className={`d-flex ${styles.searchContainer}`}>
            <button className={styles.searchButton}>
              <i className="bi bi-search"></i>
            </button>
            <input
              type="text"
              placeholder="Search by name, job title, ..."
              className={`${styles.searchInput} d-none d-sm-block`}
            />
          </div>
        </div>
        
        <div className={`${styles.rightCol} col d-flex d-none d-sm-flex order-sm-2 order-1`}>
          <div className={styles.leftNavs}>
            <div className={styles.linkWrapper}>
              <div className="icon-holder">
                <i className="bi bi-house-door"></i>
              </div>
              <Link href={"/other"}>Home</Link>
            </div>

            <div className={styles.linkWrapper}>
              <div className="icon-holder">
                <i className="bi bi-briefcase"></i>
              </div>
              <Link href={"/other"}>Jobs</Link>
            </div>

            <div className={styles.linkWrapper}>
              <div className="icon-holder">
                <i className="bi bi-people"></i>
              </div>
              <Link href={"/other"}>Employers</Link>
            </div>
          </div>

          <div className="vertical-liner mx-3"></div>

          <div className={styles.rightNavs}>
            <div className={styles.linkWrapper}>
              <div className="icon-holder">
                <i className="bi bi-bell"></i>
              </div>
              <Link href={"/other"}>Notifications</Link>
            </div>

            <div className={styles.linkWrapper}>
              <div className="icon-holder">
                <i className="bi bi-chat-dots"></i>
              </div>
              <Link href={"/other"}>Messaging</Link>
            </div>

            <div className={styles.linkWrapper}>
              <div className="icon-holder">
                <i className="bi bi-people"></i>
              </div>
              <Link href={"/other"}>Employers</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}