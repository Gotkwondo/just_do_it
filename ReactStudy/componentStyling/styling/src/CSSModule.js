//Sass와 함께 사용하기
//확장자를 .module.scss로 해주고 문법만 손봐주면 사용 가능하다.

import classNames from 'classnames/bind';
import styles from './styles/CSSModule.module.scss'

//classnames사용을 위한 설정
const cx = classNames.bind(styles); //  미리 styles에서 클래스를 받아 오도록 설정

const CSSModule = () => {
  return (
    // CSS Module을 한개만 적용할 때
    // <div className={styles.wrapper}>
    
    //  CSS Module을 2개 적용할때 (백틱과 템플릿 리터럴을 이용)
    // <div className={`${styles.wrapper} ${styles.inverted}`}>
    
    //classnames 라이브러리를 사용했을 때(classnames의 내장 함수인 bind를 동시 이용)
    <div className={cx('wrapper', 'inverted')}>
      안녕하세요, 저는 <span className="something">CSS Module!</span>
    </div>
  );
};

export default CSSModule;