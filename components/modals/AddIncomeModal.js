import { useRef, useEffect, useContext } from "react";
import { currencyFormatter } from "@/lib/utils";
import { toast } from "react-toastify";

import { financeContext } from "@/lib/store/finance-context";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";

import SlideOver from "../SlideOver";

function AddIncomeModal({ show, onClose }) {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(financeContext);
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Handler Functions
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    try {
      await addIncomeItem(newIncome);
      descriptionRef.current.value = "";
      amountRef.current.value = "";
      toast.success("Income added successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);
      toast.success("Income deleted successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <SlideOver show={show} onClose={onClose} title="Add Income">
      <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium leading-6">
            Income Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              id="amount"
              ref={amountRef}
              min={0.01}
              step={0.01}
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="Enter income amount"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium leading-6">
            Description
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="description"
              id="description"
              ref={descriptionRef}
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="Enter income description"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-md border border-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Add Income
        </button>

      </form>

      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          
        </div>
      </div>

      <h3 className="text-2xl font-bold mt-5">Income History</h3>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0">Date</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Description</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Amount</th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {income.map((i) => {
            return (
              <tr key={i.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                  {i.createdAt.toMillis
                    ? new Date(i.createdAt.toMillis()).toLocaleDateString('en-UK', dateOptions)
                    : i.createdAt.toLocaleDateString('en-UK', dateOptions)
                  }
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  {i.description}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  {currencyFormatter(i.amount)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <button
                    onClick={() => {
                      deleteIncomeEntryHandler(i.id);
                    }}
                  >
                    <FaRegTrashAlt />
                    <span className="sr-only">Delete, {i.description}</span>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </SlideOver>
  );
}

export default AddIncomeModal;