// Define las rutas e interpreta body, params y query.

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDTO } from './dto/create-loan.dto';
import type { LoanStatus } from './loans.interface';

@Controller('loans')
export class LoansController {
  //se inyecto el loanservice en el constructor de loans controller
  constructor(private readonly loansService: LoansService) {}

  //status
  @Get()
  getAllLoans(@Query('status') status?: LoanStatus) {
    return this.loansService.getAllLoans(status);
  }

  // eliminar un préstamo por id
  @Delete(':id')
  deleteLoan(@Param('id') id: string) {
    const loan = this.loansService.deleteLoan(Number(id));

    if (!loan) {
      throw new NotFoundException('El préstamo con id ' + id + ' no existe');
    }

    return loan;
  }

  //por id
  @Get(':id')
  getOneLoan(@Param('id') id: string) {
    const loan = this.loansService.getOneLoan(Number(id));

    if (!loan) {
      throw new NotFoundException('El préstamo con id ' + id + ' no existe');
    }

    return loan;
  }

  //cambiar de borrowed a returned
  @Patch(':id/return')
  returnLoan(@Param('id') id: string) {
    const loan = this.loansService.returnLoan(Number(id));

    if (!loan) {
      throw new NotFoundException('El préstamo con id ' + id + ' no existe');
    }

    return loan;
  }

  //crearlo
  @Post()
  createLoan(@Body() body: CreateLoanDTO) {
    return this.loansService.createLoan(body);
  }
}
