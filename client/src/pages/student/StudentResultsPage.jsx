import { useQuery } from '@tanstack/react-query';
import { Download } from 'lucide-react';
import { api } from '../../api/client';
import { Button, DataTable, Badge, EmptyState, Skeleton } from '../../components/ui';

export function StudentResultsPage() {
  const { data: exams = [], isLoading } = useQuery({
    queryKey: ['student-results'],
    queryFn: async () => (await api.get('/student/results')).data.data,
  });

  const downloadPdf = async (examId, examName) => {
    const res = await api.get(`/student/report-card/${examId}`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = `ReportCard_${examName.replace(/\s+/g, '_')}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) return <Skeleton className="h-48 w-full" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Examination Results</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">View subject-wise marks and download official PDF report cards</p>
      </div>

      {exams.length === 0 ? (
        <EmptyState title="No Exam Results Yet" description="Your published exam results will appear here." />
      ) : (
        exams.map((item) => (
          <div key={item.exam._id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{item.exam.name}</h2>
                <p className="text-xs text-slate-500">
                  Percentage: <strong>{item.percentage}%</strong> · GPA: <strong>{item.gpa}</strong> · Grade: <strong>{item.overallGrade}</strong>
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => downloadPdf(item.exam._id, item.exam.name)}>
                <Download className="h-4 w-4" /> Download Report Card (PDF)
              </Button>
            </div>

            <DataTable
              columns={[
                { key: 'subjectName', label: 'Subject' },
                { key: 'marksObtained', label: 'Obtained' },
                { key: 'maxMarks', label: 'Max Marks' },
                { key: 'grade', label: 'Grade', render: (r) => <Badge color="indigo">{r.grade}</Badge> },
                { key: 'isPass', label: 'Status', render: (r) => <Badge color={r.isPass ? 'emerald' : 'rose'}>{r.isPass ? 'PASS' : 'FAIL'}</Badge> },
              ]}
              data={item.marksList}
            />
          </div>
        ))
      )}
    </div>
  );
}
