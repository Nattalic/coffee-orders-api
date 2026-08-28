import { Injectable } from '@nestjs/common';
import { Loan, LoanStatus } from './loans.interface';
import { CreateLoanDTO } from './dto/create-loan.dto';

@Injectable()
export class LoansService {
  private loans: Loan[] = [
    {
      //base de datos temporal
      id: 1,
      student: 'Natalia',
      equipment: 'Portátil',
      status: 'borrowed',
    },
    {
      id: 2,
      student: 'Juan Pablo',
      equipment: 'Ipad',
      status: 'returned',
    },
  ];

  //filtrar por statuss
  getAllLoans(status?: LoanStatus): Loan[] {
    if (status) {
      return this.loans.filter((loan) => loan.status === status);
    }

    return this.loans;
  }

  //borrar lo an
  deleteLoan(id: number): Loan | undefined {
    //find busca el prestamo q se quiere borrar y filter filtra el nuevo arreglo sin el prestamo eliminado
    const loan = this.loans.find((loan) => loan.id === id);

    if (!loan) {
      return undefined;
    }

    this.loans = this.loans.filter((loan) => loan.id !== id);

    return loan;
  }

  //traer solo un loan
  getOneLoan(id: number): Loan | undefined {
    return this.loans.find((loan) => loan.id === id);
  }

  //cambiar de borrowed a returned
  returnLoan(id: number): Loan | undefined {
    //busca el prestamo
    const loan = this.loans.find((loan) => loan.id === id);

    //si no existe returnn undifined
    if (!loan) {
      return undefined;
    }

    //si si existe se cambia a returned
    loan.status = 'returned';

    return loan;
  }

  //se crea el prestamo
  createLoan(createLoanDto: CreateLoanDTO): Loan {
    const newLoan: Loan = {
      id: this.loans.length + 1,
      student: createLoanDto.student,
      equipment: createLoanDto.equipment,
      status: 'borrowed',
    };

    this.loans.push(newLoan);

    return newLoan;
  }
}
