import React, { lazy, memo } from 'react';
import PropTypes from 'prop-types';

const Button = lazy(() => import('../Button'));

const PageControls = ({ currentPage, totalPages, onPrevious, onNext }) => (
  <div className="pagination-controls">
    <Button label="<" onClick={onPrevious} disabled={currentPage === 1} />
    <span>
      {currentPage} / {totalPages}
    </span>
    <Button label=">" onClick={onNext} disabled={currentPage === totalPages} />
  </div>
);

PageControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default memo(PageControls);
