import { useSelector } from 'react-redux'
import { AppState } from '../store'

export const useAppSelector = useSelector.withTypes<AppState>()
