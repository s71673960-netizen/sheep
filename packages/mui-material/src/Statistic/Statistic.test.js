import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import Statistic from '@mui/material/Statistic';

describe('<Statistic />', () => {
  const { render } = createRenderer();

  it('renders title, prefix, formatted value, and suffix in order', () => {
    const { container } = render(
      <Statistic title="订单金额" value={1234.5} prefix="¥" suffix="元" />,
    );

    expect(container.textContent).to.equal('订单金额¥1,234.5元');
  });

  it('formats finite numeric values with the default separators', () => {
    const { container } = render(<Statistic value={1234567.89} />);

    expect(container.textContent).to.equal('1,234,567.89');
  });

  it('applies precision before grouping', () => {
    const { container } = render(<Statistic value={1234.5} precision={2} />);

    expect(container.textContent).to.equal('1,234.50');
  });

  it('uses custom group and decimal separators', () => {
    const { container } = render(
      <Statistic value={1234.5} precision={2} groupSeparator=" " decimalSeparator="," />,
    );

    expect(container.textContent).to.equal('1 234,50');
  });

  it('renders formatter output and passes it the raw value', () => {
    let receivedValue;
    const { container } = render(
      <Statistic
        value={1234.5}
        precision={2}
        formatter={(value) => {
          receivedValue = value;
          return '自定义';
        }}
      />,
    );

    expect(receivedValue).to.equal(1234.5);
    expect(container.textContent).to.equal('自定义');
  });
});
