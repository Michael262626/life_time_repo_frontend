'use client'

import { useEffect, useState } from 'react'
import { User } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { deleteAccount, fetchAccountHolders, updateAccount } from '@/store/accountSlice'
import Swal from 'sweetalert2'
import { Button } from './ui/button'
import { UpdateAccountModal } from './UpdateAccountModal'
import {useRouter} from 'next/navigation'
import AddAccountHolderModal from '@/components/account-holder-modal'

interface Account {
  id: string
  firstName: string
  lastName: string
  occupation: string
  createdAt: string
  image: string 
}


export default function DashboardContent() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { accounts, loading, error } = useAppSelector((state: any) => state.account)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

const openModal = (acc: Account) => {
  setSelectedAccount(acc)
  setIsModalOpen(true)
}
const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    dispatch(fetchAccountHolders())
  }, [dispatch])

  const handleDelete = (id: string) => {
    dispatch(deleteAccount(id))
  }
  const handleUpdate = (id: string, data: { firstName: string; lastName: string; occupation: string }) => {
    dispatch(updateAccount({ id, data }))
  }
  const handleCreateModal = ()=>{
    router.push("/account-holder-modal")
  }
  

  const hasAccounts = Array.isArray(accounts) && accounts.length > 0

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error loading account holders. Please try again later.',
        confirmButtonText: 'Close',
      })
    }
  }, [error])

  if (loading) {
    return <div className="text-center py-12">Loading account holders...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {hasAccounts ? (
        <div className="w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Account Holders</h2>
          <ul className="space-y-4">
            {accounts.map((acc: Account) => (
              <li
                key={acc.id}
                className="border p-4 rounded-lg shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
              <img
                src={`http://localhost:3001/uploads/${acc.image}`}
                alt={`${acc.firstName} ${acc.lastName}`}
                className="w-16 h-16 rounded-full object-cover border"
              />
            <div>
              <h4 className="text-lg font-semibold">Name: {acc.firstName} {acc.lastName}</h4>
              <p className="text-gray-500">Occupation: {acc.occupation}</p>
              <p className="text-gray-500">
                Date: {new Date(acc.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                })}
              </p>
            </div>
          </div>
                <div className="flex space-x-4">
                <Button
                  onClick={() => openModal(acc)}
                  variant="outline"
                  className="text-blue-500 hover:text-blue-700 border-blue-500 hover:bg-blue-50"
                >
                Update
              </Button>
                  <Button
                    onClick={() => handleDelete(acc.id)}
                    variant="outline"
                    className="text-red-500 hover:text-red-700 border-red-500 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <UpdateAccountModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onUpdate={handleUpdate}
            account={selectedAccount}
          />
        </div>
      ) : (
        <>
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full border-2 border-green-500 flex items-center justify-center">
              <User className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">No account holder added</h3>
          <p className="text-center text-gray-600 max-w-md mb-6">
            You're yet to add an account holder. Adding an account would give you access to adding various valuable
            assets for each holder.
          </p>
          <Button onClick={openCreateModal} className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">Add Account Holder</Button>
            <AddAccountHolderModal visible={isCreateModalOpen} onClose={closeCreateModal} />
        </>
      )}
    </div>
  )
}
