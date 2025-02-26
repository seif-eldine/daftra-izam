import { Job } from "@/hooks/useJobs";
import styles from "./JobCard.module.scss";
import Image from "next/image";

export interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.logoAndIntroHolder}>
          <div className={styles.logo}>
            <Image
              src={`/${job.logoPath}`}
              alt={`${job.company} Logo`}
              width={50}
              height={50}
              className={styles.logoImage}
              priority
            />
          </div>
          <div className={styles.intro}>
            <div className={styles.jobTitle}>{job.title}</div>
            <div className={styles.companyName}>{job.company}</div>
          </div>
        </div>
        <div className={styles.locationAndTimeHolder}>
          <span className={styles.location}>
            <i className="bi bi-geo-alt"></i>
            {job.location}
          </span>
          <span className={styles.postedAt}>{job.postedAt}</span>
        </div>

        <div className={styles.criteriasHolder}>
          {job.criterias.map((criteria, idx) => {
            return (
              <span key={idx} className={`criteria-chip mx-2`}>
                {criteria}
              </span>
            );
          })}
        </div>

        <hr />

        <div className={styles.tagsHolder}>
          {job.tags.map((tag, idx) => {
            return (
              <span key={idx} className={styles.tag}>
                {tag}
                {idx + 1 !== job.tags.length && "  -  "}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
