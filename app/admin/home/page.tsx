'use client';

import { IoMdHome } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard } from 'react-icons/md';

import Widget from '../../../components/widget/Widget';
import ComplexTable from '../../../components/admin/default/ComplexTable';
import tableDataComplex from '../../../variables/data-tables/tableDataComplex';
import Progress from '../../../components/progress';

const Dashboard = () => {
  const progressValue = 70;
  const progressBarColor = 'blue';
  const progressBarWidth = '20%';
  return (
    <div>
      {/* Card widget */}
      <Progress
        value={progressValue}
        color={progressBarColor}
        width={progressBarWidth}
      />

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Earnings'}
          subtitle={'$340.5'}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={'Spend this month'}
          subtitle={'$642.39'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Sales'}
          subtitle={'$574.34'}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={'Your Balance'}
          subtitle={'$1,000'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'New Tasks'}
          subtitle={'145'}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={'Total Projects'}
          subtitle={'$2433'}
        />
      </div>

      <div className="mt-5 gap-5 xl:grid-cols-2">
        <ComplexTable tableData={tableDataComplex} />
      </div>
    </div>
  );
};

export default Dashboard;
