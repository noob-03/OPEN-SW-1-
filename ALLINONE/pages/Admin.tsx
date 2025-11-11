import React from 'react';
import { ReportStatus } from '../types';
import { useReports } from '../context/ReportContext';

const Admin: React.FC = () => {
    const { reports, updateReportStatus } = useReports();

    const handleReportAction = (reportId: number, newStatus: ReportStatus) => {
        updateReportStatus(reportId, newStatus);
    };
    
  return (
    <div>
      <h1 className="text-3xl font-bold text-highlight mb-8">관리자 대시보드</h1>
      
      <div className="bg-secondary p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">신고 관리</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-primary rounded-lg">
            <thead className="bg-accent">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">신고 ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">대상 정보</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">사유</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent">
              {reports.map(report => (
                <tr key={report.id} className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">{report.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">{report.targetType} #{report.targetId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">{report.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.status === ReportStatus.PENDING ? 'bg-yellow-200 text-yellow-800' : 
                        report.status === ReportStatus.RESOLVED ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {report.status === ReportStatus.PENDING && (
                         <div className="flex space-x-2">
                            <button onClick={() => handleReportAction(report.id, ReportStatus.RESOLVED)} className="text-green-600 hover:text-green-800">승인</button>
                            <button onClick={() => handleReportAction(report.id, ReportStatus.DISMISSED)} className="text-red-600 hover:text-red-800">거절</button>
                        </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;