import { useContext, Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { financeContext } from "@/lib/store/finance-context";
import { toast } from "react-toastify";

import { currencyFormatter } from "@/lib/utils";

import { FaRegTrashAlt } from "react-icons/fa";
import SlideOver from "../SlideOver";

function ViewExpenseModal({ show, onClose, expense }) {
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [open, setOpen] = useState(true)
  const { deleteExpenseItem, deleteExpenseCategory } =
    useContext(financeContext);

  const deleteExpenseHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id);
      toast.success("Expense category deleted");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteExpenseItemHandler = async (item) => {
    try {
      //  Remove the item from the list
      const updatedItems = expense.items.filter((i) => i.id !== item.id);

      // Update the expense balance
      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.amount,
      };

      await deleteExpenseItem(updatedExpense, expense.id);
      toast.success("Expense item successfully deleted");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <SlideOver show={show} onClose={onClose} title="Add Income">
      <div className="h-full flex flex-col justify-between">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0">Date</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Amount</th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {expense.items.map((item) => {
            return (
              <tr key={item.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                  {item.createdAt.toMillis
                    ? new Date(item.createdAt.toMillis()).toLocaleDateString('en-UK', dateOptions)
                    : item.createdAt.toLocaleDateString('en-UK', dateOptions)
                  }
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  {currencyFormatter(item.amount)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <button
                    onClick={() => {
                      deleteExpenseItemHandler(item);
                    }}
                  >
                    <FaRegTrashAlt />
                    <span className="sr-only">Delete, {item.amount}</span>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button
          type="button"
          onClick={deleteExpenseHandler}
          className="w-full rounded-md border border-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Delete {expense.title} Category
        </button>
        </div>
    </SlideOver>
  )
}

export default ViewExpenseModal;