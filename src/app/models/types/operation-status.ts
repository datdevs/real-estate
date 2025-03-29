import { OPERATION_STATE } from '../../core/constant';

export type OperationStatus = OPERATION_STATE.Idle | OPERATION_STATE.Success | OPERATION_STATE.Failure;
