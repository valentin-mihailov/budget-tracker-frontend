import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TransactionsService } from 'src/app/Services/transactions.service';

Chart.register(...registerables);

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit, AfterViewInit {
  constructor(private transactionsService: TransactionsService) {}

  incomeChart: any;
  expenseChart: any;
  totalIncome: number = 0;
  totalExpenses: number = 0;

  ngOnInit(): void {
    this.transactionsService.transactions$.subscribe(() => {
      this.totalIncome = this.transactionsService.getTotalIncome();
      this.totalExpenses = this.transactionsService.getTotalExpenses();

      if (this.incomeChart && this.expenseChart) {
        this.updateChartData();
      }
    });
  }

  ngAfterViewInit(): void {
    this.createCharts();
  }

  createCharts() {
    const incomeData = this.transactionsService.getPieChartData('income');
    const expenseData = this.transactionsService.getPieChartData('expense');

    this.incomeChart = new Chart('incomeChart', {
      type: 'pie',
      data: incomeData,
      options: { responsive: true, maintainAspectRatio: false },
    });

    this.expenseChart = new Chart('expenseChart', {
      type: 'pie',
      data: expenseData,
      options: { responsive: true, maintainAspectRatio: false },
    });
  }

  updateChartData() {
    const iData = this.transactionsService.getPieChartData('income');
    const eData = this.transactionsService.getPieChartData('expense');

    this.incomeChart.data = iData;
    this.expenseChart.data = eData;

    this.incomeChart.update();
    this.expenseChart.update();
  }
}
